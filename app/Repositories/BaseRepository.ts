import type { ModelAttributes, LucidModel } from '@ioc:Adonis/Lucid/Orm'
import type { BaseRepositoryInterface } from './Interfaces/BaseRepositoryInterface'

export default abstract class BaseRepository <Model extends LucidModel> implements BaseRepositoryInterface<Model> {
  protected readonly model: Model

  public async findAll(): Promise<InstanceType<Model>[]> {
    return this.model.all()
  }

  public async findAllBy(descriptor: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>[]> {
    return this.model
      .query()
      .where(descriptor)
  }

  public async find(id: number): Promise<InstanceType<Model>> {
    return this.model.findOrFail(id)
  }

  public async findBy(descriptor: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>> {
    return this.model
      .query()
      .where(descriptor)
      .firstOrFail()
  }

  public async create(payload: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>> {
    return this.model.create(payload)
  }

  public async update(id: number, payload: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>[]> {
    return this.model
      .query()
      .where('id', id)
      .update(payload)
  }

  public async delete(id: number): Promise<InstanceType<Model>[]> {
    return this.model
      .query()
      .where('id', id)
      .delete()
  }
}
