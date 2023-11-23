import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AppDataSource } from "../data-source";

@Entity({ name: "todo" })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @Column()
  priority: string;

  @Column()
  status: string;
}
const todoRepository = AppDataSource.getRepository(Todo);

export async function getTodos(
  searchCriteria?: Array<{ property: string; value: any }>
): Promise<Todo[]> {
  const queryBuilder = todoRepository.createQueryBuilder();

  if (searchCriteria && searchCriteria.length > 0) {
    let whereConditions = [];

    for (const searchCriterion of searchCriteria) {
      whereConditions.push(
        `${searchCriterion.property} = '${searchCriterion.value}'`
      );
    }

    const whereClause = whereConditions.join(" AND ");
    queryBuilder.where(whereClause);
  }

  return await queryBuilder.getMany();
}
