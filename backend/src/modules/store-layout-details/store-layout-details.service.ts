import { Injectable, NotFoundException } from '@nestjs/common';
import { AbstractService } from '../../commons/abstract.service';
import { storeLayoutDetailsRepository } from './repository/store-layout-details.repository';
import { StoreLayoutDetails } from './entities/store-layout-details.entity';
import { CreateStoreLayoutDetailsInput } from './dto/create-store-layout-details.input';
import { UpdateStoreLayoutDetailsInput } from './dto/update-store-layout-details.input';
import { StoreLayoutSlidersService } from '../store-layout-sliders/store-layout-sliders.service';

@Injectable()
export class StoreLayoutDetailsService extends AbstractService {
  constructor(private storeLayoutSlidersService: StoreLayoutSlidersService) {
    super(storeLayoutDetailsRepository);
  }

  async create(
    data: CreateStoreLayoutDetailsInput,
    relations: string[] = null,
  ): Promise<StoreLayoutDetails | boolean> {
    data.social_links = JSON.stringify(data.social_links);
    const { slider_name, slider_description, slider_image, ...rest } = data;
    const create = await this.abstractCreate(rest, relations);
    if (create) {
      await this.storeLayoutSlidersService.create({
        name: slider_name,
        description: slider_description,
        image_id: slider_image,
        store_id: create.id,
      });
    }
    return create;
  }

  async update(
    id: number,
    data: UpdateStoreLayoutDetailsInput,
    relations: string[] = null,
  ): Promise<StoreLayoutDetails | boolean> {
    const storeLayoutDetailsData = await this.findOne({
      where: { id },
    });

    if (!storeLayoutDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }
    data.social_links = JSON.stringify(data.social_links);
    const { slider_name, slider_description, slider_image, ...rest } = data;
    const update = await this.abstractUpdate(id, { ...rest, id }, relations);
    if (update) {
      const storeLayoutSliders = await this.storeLayoutSlidersService.findOne({
        where: { store_id: id },
      });

      await this.storeLayoutSlidersService.abstractUpdate(
        storeLayoutSliders.id,
        {
          id: storeLayoutSliders.id,
          name: slider_name,
          description: slider_description,
          image_id: slider_image,
        },
      );
    }
    return update;
  }

  async remove(id: number) {
    const storeLayoutDetailsData = await this.findOne({ where: { id } });
    if (!storeLayoutDetailsData) {
      throw new NotFoundException('This record does not exist!');
    }
    return await this.abstractRemove(id);
  }
}
