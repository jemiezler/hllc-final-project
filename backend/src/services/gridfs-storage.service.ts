// import { Injectable } from '@nestjs/common';
// import { InjectConnection } from '@nestjs/mongoose';
// import { Connection } from 'mongoose';
// import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';

// @Injectable()
// export class GridFsStorageService {
//   private bucket: GridFSBucket;

//   constructor(@InjectConnection() private readonly connection: Connection) {
//     const client = new MongoClient(this.connection.client.s.url);
//     const db = client.db(this.connection.db.databaseName);
//     this.bucket = new GridFSBucket(db, { bucketName: 'uploads' });
//   }

//   async uploadFile(file: Express.Multer.File): Promise<ObjectId> {
//     const uploadStream = this.bucket.openUploadStream(file.originalname);
//     const fileBuffer = Buffer.from(file.buffer);

//     await new Promise<void>((resolve, reject) => {
//       uploadStream.write(fileBuffer, (error) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve();
//         }
//       });
//     });

//     return uploadStream.id as ObjectId;
//   }

//   async getFileStreamById(id: ObjectId): Promise<GridFSBucketReadStream> {
//     return this.bucket.openDownloadStream(id);
//   }
// }
