# diagram.py
from diagrams import Diagram
from diagrams.aws.general import Client
from diagrams.aws.network import Route53
from diagrams.aws.network import CloudFront
from diagrams.aws.security import WAF
from diagrams.aws.storage import S3



with Diagram("Website Hosting with S3 and CloudFront", show=False):

     Client("clients") >> Route53("dns") >> WAF("waf") >> CloudFront("cloudfront") >> S3("s3 bucket") 
                                                                