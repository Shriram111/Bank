terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment
  vpc_cidr     = var.vpc_cidr
  subnet_cidrs = var.subnet_cidrs
  azs          = ["${var.aws_region}a", "${var.aws_region}b"]
}

module "ecr" {
  source       = "./modules/ecr"
  project_name = var.project_name
  environment  = var.environment
}

module "rds" {
  source             = "./modules/rds"
  project_name       = var.project_name
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.subnet_ids
  db_password        = var.db_password
  allowed_cidr_block = module.vpc.vpc_cidr
}

module "redis" {
  source             = "./modules/redis"
  project_name       = var.project_name
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.subnet_ids
  allowed_cidr_block = module.vpc.vpc_cidr
}

module "alb" {
  source       = "./modules/alb"
  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_id
  subnet_ids   = module.vpc.subnet_ids
}

module "ecs" {
  source                   = "./modules/ecs"
  project_name             = var.project_name
  environment              = var.environment
  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.subnet_ids
  backend_ecr_url          = module.ecr.backend_url
  frontend_ecr_url         = module.ecr.frontend_url
  alb_backend_tg_arn       = module.alb.backend_target_group_arn
  alb_frontend_tg_arn      = module.alb.frontend_target_group_arn
  db_endpoint              = module.rds.endpoint
  redis_endpoint           = module.redis.endpoint
  db_password              = var.db_password
  backend_security_group_id = module.alb.backend_security_group_id
}

module "cloudwatch" {
  source           = "./modules/cloudwatch"
  project_name     = var.project_name
  environment      = var.environment
  ecs_cluster_name = module.ecs.cluster_name
  ecs_service_name = module.ecs.backend_service_name
}
