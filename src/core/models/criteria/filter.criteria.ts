import { Criteria } from "./criteria";

interface FilterPostgresProps {
    criteria: Criteria<Object>[];
    logic: 'AND' | 'OR';
}

export class FilterPostgres implements Criteria<{ [key: string]: any[] }> {

    public readonly criteria: Criteria<Object>[]
    public readonly logic : 'AND' | 'OR'

    constructor({ criteria, logic }: FilterPostgresProps) {
        this.criteria = criteria
        this.logic = logic
    }
  
    applyFilter() {
      const subqueries = this.criteria.map(c => c.applyFilter());
      return {
        [this.logic]: subqueries,
      };
    }
  }