resource "aws_route53_zone" "main" {
  name = var.domain_name
  tags = var.common_tags
}

resource "aws_route53_record" "ns-record" {
  allow_overwrite = true
  name            = var.domain_name
  ttl             = 172800
  type            = "NS"
  zone_id         = aws_route53_zone.main.zone_id

  records = [
    "ns-1577.awsdns-05.co.uk",
    "ns-486.awsdns-60.com",
    "ns-725.awsdns-26.net",
    "ns-1429.awsdns-50.org",
  ]
}

resource "aws_route53_record" "soa-record" {
  allow_overwrite = true
  name            = var.domain_name
  ttl             = 172800
  type            = "SOA"
  zone_id         = aws_route53_zone.main.zone_id

  records = ["ns-1577.awsdns-05.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
}

resource "aws_route53_record" "root-a" {
  zone_id = aws_route53_zone.main.zone_id
  name = var.domain_name
  type = "A"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-a" {
  zone_id = aws_route53_zone.main.zone_id
  name = "www.${var.domain_name}"
  type = "A"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root-aaaa" {
  zone_id = aws_route53_zone.main.zone_id
  name = var.domain_name
  type = "AAAA"

  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www-aaaa" {
  zone_id = aws_route53_zone.main.zone_id
  name = "www.${var.domain_name}"
  type = "AAAA"
  alias {
    name = aws_cloudfront_distribution.www_s3_distribution.domain_name
    zone_id = aws_cloudfront_distribution.www_s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}