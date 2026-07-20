variable "project_name" { type = string }
variable "environment" { type = string }

resource "aws_ecr_repository" "frontend" {
  name                 = "${var.project_name}-frontend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
}

resource "aws_ecr_repository" "backend" {
  name                 = "${var.project_name}-backend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration { scan_on_push = true }
}

output "frontend_url" { value = aws_ecr_repository.frontend.repository_url }
output "backend_url" { value = aws_ecr_repository.backend.repository_url }
