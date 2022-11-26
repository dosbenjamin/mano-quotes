import type { LucidModel, ModelAttributes } from '@ioc:Adonis/Lucid/Orm'

export interface BaseRepositoryInterface <Model extends LucidModel> {
  findAll(): Promise<InstanceType<Model>[]>
  findAllBy(descriptor: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>[]>
  find(id: number): Promise<InstanceType<Model>>
  findBy(descriptor: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>>
  create(payload: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>>
  update(id: number, payload: Partial<ModelAttributes<InstanceType<Model>>>): Promise<InstanceType<Model>[]>
  delete(id: number): Promise<InstanceType<Model>[]>
}
