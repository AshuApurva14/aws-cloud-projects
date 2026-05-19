variable "aws_region" {
   description = "AWS region to deploy resources"
   type = string
   default = "ap-south-1"
} 

variable "environment" {
   description = "Environment value for deployment of resources"
   type = string
   default = "dev"
}