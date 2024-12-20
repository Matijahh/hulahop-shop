import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MaxLength, ValidateIf } from 'class-validator';
import { Images } from '../../images/entities/images.entity';

@Entity('shop_slider', { schema: 'hulahop_dev' })
export class ShopSlider {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @MaxLength(36)
  @Column('varchar', { name: 'image_id', nullable: true, length: 36 })
  image_id: string | null;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @ValidateIf((val) => val.status !== null)
  @Column('boolean', { name: 'status', nullable: true })
  status: boolean | null;

  @ManyToOne(() => Images, (images) => images.shop_sliders, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'image_id', referencedColumnName: 'id' }])
  image: Images;
}
