output "alb_dns_name" {
  description = "ALB DNS name - use this to access the app"
  value       = module.alb.dns_name
}

output "ecr_backend_url" {
  description = "ECR Backend Repository URL"
  value       = module.ecr.backend_url
}

output "ecr_frontend_url" {
  description = "ECR Frontend Repository URL"
  value       = module.ecr.frontend_url
}

output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = module.ecs.cluster_name
}

output "ecs_backend_service" {
  description = "ECS Backend Service Name"
  value       = module.ecs.backend_service_name
}

output "ecs_frontend_service" {
  description = "ECS Frontend Service Name"
  value       = module.ecs.frontend_service_name
}
