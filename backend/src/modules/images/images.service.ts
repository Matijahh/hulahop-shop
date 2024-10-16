import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { imagesRepository } from './repository/images.repository';
import { Images } from './entities/images.entity';
import { CreateImagesInput } from './dto/create-images.input';
import { UpdateImagesInput } from './dto/update-images.input';
import { extname, join } from 'path';
import * as fs from 'fs';

@Injectable()
export class ImagesService extends AbstractService {
  constructor() {
    super(imagesRepository);
  }

  async create(data: CreateImagesInput): Promise<Images> {
    return await this.abstractCreate(data);
  }

  async update(
    id: number,
    data: UpdateImagesInput,
    relations: string[] = null,
  ): Promise<Images | boolean> {
    const image = await this.findOne({ where: { id } });
    if (!image) {
      throw new BadRequestException('Record does not exist');
    }
    data.updated_at = Date.now().toString();
    const update = this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async getPathDetails(id: string) {
    const file = await this.findOne({ where: { id } });
    if (!file) {
      throw new BadRequestException('Record does not exist');
    }
    const path = join(process.cwd(), 'uploads');
    return {
      path: path,
      fileName: file.name,
      ext: extname(file.name).substring(1),
    };
  }

  extractBase64img = (data: string) => {
    const reg = /^data:image\/([\w+]+);base64,([\s\S]+)/;
    const match = data.match(reg);
    const baseType = {
      jpeg: 'jpg',
    };
    baseType['svg+xml'] = 'svg';
    if (!match) {
      throw new Error('image base64 data error');
    }
    const extensionName = baseType[match[1]] ? baseType[match[1]] : match[1];
    return {
      extensionName: '.' + extensionName,
      base64: match[2],
    };
  };

  async remove(id: string) {
    try {
      const image = await this.findOne({ where: { id } });
      if (!image) {
        throw new BadRequestException('Record does not exist');
      }
      const path = join(process.cwd(), 'uploads', image.name);
      if (fs.existsSync(path)) {
        fs.rmSync(path);
        const remove = await this.abstractRemove(id);
        return remove;
      }
    } catch (error) {
      console.error('there was an error:', error);
    }
  }
}
