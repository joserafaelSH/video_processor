Here's an updated README for your project that reflects the architecture and technology stack you described:

---

# **Video Processing Pipeline with Kafka, Node.js, Go, and Kubernetes**

This repository contains a distributed video processing pipeline implemented using Node.js, Go, Kafka, Docker, and Kubernetes. The pipeline handles video uploads, chunking, storage, processing, and final delivery, with Kafka managing the workflow and state transitions across different microservices.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Microservices](#microservices)
  - [Upload Video Service (Node.js)](#upload-video-service-nodejs)
  - [Video Chunks Incoming Consumer (Go)](#video-chunks-incoming-consumer-go)
  - [Video Chunks Saved Consumer (Go)](#video-chunks-saved-consumer-go)
  - [Video Chunks Processed Consumer (Node.js)](#video-chunks-processed-consumer-nodejs)
- [Kafka Topics](#kafka-topics)
- [Docker and Kubernetes](#docker-and-kubernetes)
  - [Docker Setup](#docker-setup)
  - [Kubernetes Deployment](#kubernetes-deployment)
- [Contributing](#contributing)
- [License](#license)

## **Project Overview**

![target](https://github.com/user-attachments/assets/5069fb09-4d03-4c87-84f8-bf549b420805)


This project implements a scalable video processing pipeline where video files are uploaded, chunked, stored, and processed asynchronously. The application is split into multiple microservices, written in Node.js and Go, that communicate via Kafka topics. The entire pipeline is containerized using Docker and orchestrated in Kubernetes.

## **Architecture**

1. **Video Upload via API (Node.js)**: A user uploads a video file, which is then split into smaller chunks.
2. **Kafka Workflow**:
   - **`video-chunks-incoming-consumer` (Go)**: Listens for chunks to save in S3 and MongoDB.
   - **`video-chunks-saved-consumer` (Go)**: Triggers processing after all chunks are saved.
   - **`video-chunks-processed-consumer` (Node.js)**: Handles the processing of chunks and stores the final results.
3. **Storage**: Video chunks are stored in AWS S3 (simulated using LocalStack) and their metadata is tracked in MongoDB.
4. **Orchestration**: The entire system is deployed in Kubernetes for scalability and reliability.

## **Technologies Used**

- **Node.js**: Handles API requests and the final processing stage.
- **Go**: Handles the initial saving of chunks and triggers the processing stage.
- **Kafka**: Manages the message workflow between microservices.
- **MongoDB**: Stores metadata and tracks the status of video chunks.
- **AWS S3 (via LocalStack)**: Stores video chunks.
- **Docker**: Containerizes the application.
- **Kubernetes**: Orchestrates the containerized microservices.

## **Getting Started**

### **Prerequisites**

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Go](https://golang.org/) (v1.16 or higher)
- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/) (Minikube or a similar tool for local development)
- [Kafka](https://kafka.apache.org/)
- [MongoDB](https://www.mongodb.com/)
- [LocalStack](https://github.com/localstack/localstack) (for S3 simulation)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/video-processing-pipeline.git
   cd video-processing-pipeline
   ```

2. Install dependencies for each microservice:
   - **Node.js services**:
     ```bash
     cd upload-video-service
     npm install
     cd ../video-chunks-processed-consumer
     npm install
     ```
   - **Go services**:
     ```bash
     cd video-chunks-incoming-consumer
     go mod tidy
     cd ../video-chunks-saved-consumer
     go mod tidy
     ```

### **Environment Variables**

Create a `.env` file in each service directory and add the following environment variables:

```env
# Common variables for all services
KAFKA_BROKER=localhost:9092
MONGODB_URI=mongodb://localhost:27017/videoDB

# Node.js services (upload-video-service, video-chunks-processed-consumer)
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
S3_BUCKET=your-s3-bucket-name

# Go services (video-chunks-incoming-consumer, video-chunks-saved-consumer)
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
S3_BUCKET=your-s3-bucket-name
```

### **Running the Application**

To start the application locally, you can run each service separately using Docker or Kubernetes.

## **Microservices**

### **Upload Video Service (Node.js)**

- **Description**: Receives video files via an API, splits them into chunks, and publishes them to Kafka.
- **Directory**: `upload-video-service`
- **Command**:
  ```bash
  npm start
  ```

### **Video Chunks Incoming Consumer (Go)**

- **Description**: Listens to the `video-chunks-incoming` Kafka topic, saves chunks to S3, and updates MongoDB.
- **Directory**: `video-chunks-incoming-consumer`
- **Command**:
  ```bash
  go run main.go
  ```

### **Video Chunks Saved Consumer (Go)**

- **Description**: Listens to the `video-chunks-saved` Kafka topic, triggers processing after all chunks are saved.
- **Directory**: `video-chunks-saved-consumer`
- **Command**:
  ```bash
  go run main.go
  ```

### **Video Chunks Processed Consumer (Node.js)**

- **Description**: Listens to the `video-chunks-processed` Kafka topic, processes the chunks, and saves the results back to S3.
- **Directory**: `video-chunks-processed-consumer`
- **Command**:
  ```bash
  npm start
  ```

## **Kafka Topics**

- **`video-chunks-incoming`**: Chunks from the upload service are published here for storage.
- **`video-chunks-saved`**: Triggered when all chunks of a video are saved, indicating readiness for processing.
- **`video-chunks-processed`**: Indicates that chunks have been processed, allowing for final steps.

## **Docker and Kubernetes**

### **Docker Setup**

The application uses Docker to containerize each microservice. LocalStack is used to simulate S3, and MongoDB is run in a container.

1. **Build Docker images**:
   ```bash
   docker-compose build
   ```

2. **Start containers**:
   ```bash
   docker-compose up
   ```

### **Kubernetes Deployment**

To deploy the application in Kubernetes:

1. **Create Kubernetes manifests** for each service.
2. **Apply manifests** to your cluster:
   ```bash
   kubectl apply -f k8s/
   ```

3. **Monitor your services** using:
   ```bash
   kubectl get pods
   ```

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides a detailed guide on how to set up, run, and contribute to your distributed video processing pipeline project.
