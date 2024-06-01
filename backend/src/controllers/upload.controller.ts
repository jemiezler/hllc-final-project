// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   BadRequestException,
//   Body,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ObjectId } from 'mongodb';
// import { GridFsStorageService } from '../services/gridfs-storage.service';
// import { ActivityService } from 'src/activity/activity.service';
// import { CreateActivityDto } from 'src/activity/dto/create-activity.dto';

// @Controller('upload')
// export class UploadController {
//   constructor(
//     private readonly storageService: GridFsStorageService,
//     private readonly activityService: ActivityService,
//   ) {}

//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(
//     @UploadedFile() file: Express.Multer.File,
//     @Body() createActivityDto: CreateActivityDto,
//   ) {
//     if (!file) {
//       throw new BadRequestException('File is required');
//     }

//     const fileId: ObjectId = await this.storageService.uploadFile(file);
//     const pictureUrl = `/uploads/${fileId}`; // Adjust the URL based on your app's URL structure

//     const newActivity = {
//       ...createActivityDto,
//       picture: pictureUrl,
//     };

//     return this.activityService.create(newActivity);
//   }
// }
