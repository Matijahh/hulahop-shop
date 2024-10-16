import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { announcementsRepository } from './repository/announcements.repository';
import { Announcements } from './entities/announcements.entity';
import { CreateAnnouncementsInput } from './dto/create-announcements.input';
import { UpdateAnnouncementsInput } from './dto/update-announcements.input';

@Injectable()
export class AnnouncementsService extends AbstractService {
  constructor() {
    super(announcementsRepository);
  }

  async create(
    data: CreateAnnouncementsInput,
    relations: string[] = null,
  ): Promise<Announcements | boolean> {
    data.created_at = Date.now().toString();
    const create = await this.abstractCreate(data, relations);
    return create;
  }

  async update(
    id: number,
    data: UpdateAnnouncementsInput,
    relations: string[] = null,
  ): Promise<Announcements | boolean> {
    const announcementData = await this.findOne({ where: { id } });
    if (!announcementData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.updated_at = Date.now().toString();
    const update = await this.abstractUpdate(id, { ...data, id }, relations);
    return update;
  }

  async remove(id: number) {
    const announcementData = await this.findOne({ where: { id } });
    if (!announcementData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
