# 🗳️ Voter Verification and Voting System

This project is a full-stack voter verification and voting system that ensures only verified voters can vote once in an election. It uses MongoDB to store voter data, Google Cloud Vision API for text extraction from documents, and Express.js to handle the backend logic.

### 🎯 Summary

- ✅ MongoDB stores voter data.
- ✅ Google Vision API extracts text from ID proof.
- ✅ Voter is verified before voting.
- ✅ Prevents multiple votes per user.

## 📌 Step 1: Set Up TypeScript and Dependencies

1️⃣ Install Required Packages

Run the following command to set up the necessary dependencies:

```bash
npm init -y
npm install express mongoose multer dotenv @google-cloud/vision cors
npm install --save-dev typescript ts-node @types/express @types/mongoose @types/multer @types/cors
```
## 📌 Step 2: Configure TypeScript

Create a `tsconfig.json` file with the following configurations:

- `target`: Set to `ES6` for modern JavaScript syntax.
- `module`: Set to `CommonJS` for module imports/exports.
- `strict`: Enforces strict type checking.
- `outDir`: Specifies the output directory as `./dist`.
- `rootDir`: Specifies the source directory as `./src`.
- `esModuleInterop`: Enables default import compatibility with CommonJS modules.

## 📌 Step 3: MongoDB Connection (`src/db.ts`)

Set up a connection to MongoDB using Mongoose:

- Use `dotenv` to load the MongoDB URI from environment variables.
- Establish the connection asynchronously and handle errors.
- Log a success message when connected or terminate the process on error.

## 📌 Step 4: Define MongoDB Schemas

### 1️⃣ Voter Schema (`src/models/Voter.ts`)

Define a schema for the Voter document with fields such as:

- `firstName`, `lastName`: The voter's personal information.
- `dateOfBirth`, `address`: The voter's additional personal details.
- `gender`, `idType`, `documentNumber`: Identification data.
- `selfieUrl`, `documentUrl`: URLs for the voter's selfie and document.
- `mobile`, `email`: Contact information.
- `isVerified`: Boolean to track if the voter is verified.
- `hasVoted`: Boolean to ensure that the voter has voted only once.

## 📌 Step 5: Implement File Upload (`src/middleware/upload.ts`)

Set up file upload functionality with `multer`:

- Use `multer` disk storage to define the destination folder for uploads.
- Set unique filenames for uploaded files using the current timestamp.

## 📌 Step 6: Extract Text from Documents (Google Vision API)

Create an OCR helper to extract text from uploaded documents:

- Use the Google Cloud Vision API to process the document and extract text.
- Return the extracted text from the document or handle errors if extraction fails.

## 📌 Step 7: Verification API

Create an API route for verifying voters:

- Upload a document and extract text from it using OCR.
- Find the voter in the database by their `idNumber`.
- Compare the extracted text with the voter's data (name and document number) to verify their identity.
- Update the voter's verification status in the database if successful or return an error if verification fails.

## 📌 Final Steps

### Compile and Run:

```bash
tsc && node dist/server.js
```
## Deploy on AWS/Firebase/Docker
You can deploy the backend on AWS, Firebase, or Docker. Make sure to configure the environment variables and storage options accordingly.

## Build the Frontend for Interactions
Develop the frontend to allow users to interact with the system, upload their documents for verification, and cast their votes once verified.
