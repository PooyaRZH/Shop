import {
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService
    implements OnModuleInit, OnModuleDestroy {
    private pool!: Pool;

    constructor(
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        this.pool = new Pool({
            host: this.configService.get<string>('DB_HOST'),
            port: Number(this.configService.get<string>('DB_PORT')),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            // max: 10,
            // idleTimeoutMillis: 30000,
            // connectionTimeoutMillis: 5000,
        });

        await this.pool.query('SELECT 1');

        console.log('✅ Connected to PostgreSQL');
    }

    async query<T extends QueryResultRow = QueryResultRow>(
        sql: string,
        params: unknown[] = [],
    ): Promise<QueryResult<T>> {
        return this.pool.query<T>(sql, params);
    }

    async onModuleDestroy() {
        await this.pool.end();

        console.log('❌ PostgreSQL connection closed');
    }
}