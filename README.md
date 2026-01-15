Payment Processing Microservices – NestJS Monorepo
Overview

This project is a NestJS monorepo (without Nx) that implements a microservices-based payment processing system, designed to simulate a real-world e-commerce transaction flow using modern backend technologies.

The architecture is composed of an API Gateway and three independent microservices, fully containerized and orchestrated with Docker Compose. Communication between services is handled asynchronously via RabbitMQ, while PostgreSQL is used for data persistence.

The primary goal of this project is to demonstrate scalable system design, service decoupling, and event-driven communication, closely resembling production-grade payment processing systems.

Architecture

The system consists of the following components:

API Gateway

Single public entry point to the system

Validates incoming requests

Routes commands and events to the appropriate microservices

Order Service

Responsible for order creation and persistence

Stores order data in PostgreSQL

Publishes events to RabbitMQ when an order is created

Payment Service

Handles payment processing

Integrates with the Stripe Payment Gateway (sandbox/test mode)

Reacts to order events to initiate payment workflows

Order Notifications Service

Responsible for sending notifications

Uses Gmail SMTP via Nodemailer to send transactional emails

Consumes events from RabbitMQ

Technology Stack

Backend Framework: NestJS (monorepo without Nx)

Language: TypeScript

Messaging: RabbitMQ

Database: PostgreSQL

Payments: Stripe API (test environment)

Email: Gmail SMTP (Nodemailer)

Containerization: Docker & Docker Compose

Architecture Style: Microservices + Event-Driven Architecture

Why Microservices?

This project uses microservices to:

Decouple business responsibilities (orders, payments, notifications)

Enable independent execution and scalability

Improve fault isolation

Allow asynchronous processing through message queues

Simulate real production payment pipelines

Each service runs in its own container and communicates through RabbitMQ, ensuring loose coupling and parallel execution of workflows.

.
├── apps
│   ├── api-gateway
│   ├── order-service
│   ├── payment-service
│   └── order-notifications
│
├── libs
│   ├── rabbitmq
│   └── events
    └──my-library
│
├── docker-compose.yml
├── package.json
└── README.md



Each service has its own:

NestJS application

Environment configuration

Database or messaging dependencies as needed

Running the Project
Prerequisites

Docker

Docker Compose

Start the Application

All services, including PostgreSQL and RabbitMQ, are orchestrated via Docker Compose.

docker compose up -d


This command will:

Start RabbitMQ and PostgreSQL

Build and run all NestJS services

Automatically handle service dependencies via Docker health checks

Once running, the API Gateway will be available and ready to accept requests.

Environment Configuration

Each service uses its own environment variables for configuration, such as:

Database connection details

RabbitMQ connection URLs

Stripe API keys

SMTP credentials

Sensitive values should be stored in .env files and are not committed to the repository.

Key Learning Outcomes

This project demonstrates:

Designing microservices with NestJS

Implementing asynchronous communication with RabbitMQ

Coordinating multiple services using Docker Compose

Integrating external services (Stripe, SMTP)

Applying real-world backend architectural patterns

Future Improvements

Possible extensions to this project include:

Distributed tracing and observability

Centralized logging

Retry and idempotency mechanisms

Authentication and authorization

Kubernetes deployment

Author
Yuri Lourenço

Developed as a hands-on backend architecture project to simulate real-world payment processing systems using modern JavaScript technologies.