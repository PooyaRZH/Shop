import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'database/database.service';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';


@Injectable()
export class TicketRepository {
    constructor(
        private readonly databaseService: DatabaseService,
    ) { }

    async findUserById(id: number) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM users WHERE id = $1
            `, [id]
        )
        return result.rows[0]
    }

    async findMainTicketById(id: number) {
        const result = await this.databaseService.query(
            `
            SELECT * FROM tickets WHERE id = $1 AND main_ticket_id IS NULL
            `, [id]
        )
        return result.rows[0]
    }


    async create(dto: CreateTicketDto) {
        const result = await this.databaseService.query(`
      INSERT INTO tickets (
        title,
        user_id,
        main_ticket_id,
        description
      )
      VALUES (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *;
      `,
            [
                dto.title,
                dto.user_id,
                dto.main_ticket_id,
                dto.description,
            ],)

        return result.rows[0];
    }


    // --------------------------- WAY 1
    // async findAll() {
    //     const result = await this.databaseService.query(
    //         `
    //         SELECT tickets.*, users.username, users.id AS user_id FROM tickets
    //         JOIN users ON
    //         users.id = tickets.user_id 
    //         WHERE main_ticket_id IS NULL
    //         `
    //     )
    //     return result.rows
    // }

    // --------------------------- WAY 2
    async findAll() {
        const result = await this.databaseService.query(
            `
        SELECT
            tickets.id,
            tickets.title,
            tickets.description,
            tickets.created_at,
            tickets.updated_at,
            json_build_object(
                'id', users.id,
                'username', users.username
            ) AS user

        FROM tickets
        JOIN users
            ON users.id = tickets.user_id
        WHERE tickets.main_ticket_id IS NULL
        `
        );

        return result.rows;
    }








    // async findMainTicketsByUserId(id: number) {
    //     const result = await this.databaseService.query(
    //         `
    //         SELECT * FROM tickets WHERE user_id = $1 AND main_ticket_id IS NULL
    //         `, [id]
    //     )

    //     return result.rows
    //     // return result.rows[0]
    // }


    // async findTicketsUser(mainTticketId: number) {
    //     const result = await this.databaseService.query(
    //         `
    //         SELECT * FROM tickets WHERE id = $1 OR main_ticket_id = $1
    //         `, [mainTticketId]
    //     )

    //     return result.rows
    // }







    async findTicketsByUserId(userId: number) {
        const result = await this.databaseService.query(
            `
        SELECT
            main.id,
            main.title,
            main.description,

            COALESCE(
                json_agg(
                    json_build_object(
                        'id', child.id,
                        'description', child.description
                    )
                ) FILTER (WHERE child.id IS NOT NULL),
                '[]'
            ) AS answers

        FROM tickets AS main

        LEFT JOIN tickets AS child
            ON child.main_ticket_id = main.id

        WHERE main.user_id = $1
          AND main.main_ticket_id IS NULL

        GROUP BY main.id
        ORDER BY main.created_at DESC
        `,
            [userId]
        );

        return result.rows;
    }






    // LEFT JOIN
    //     ↓
    // وصل کردن Main Ticket به Answerها

    // json_build_object
    //     ↓
    // ساختن یک Object

    // json_agg
    //     ↓
    // ساختن Array از Objectها

    // FILTER
    //     ↓
    // حذف رکوردهای NULL

    // COALESCE
    //     ↓
    // تبدیل NULL به []

    // GROUP BY
    //     ↓
    // گروه‌بندی Answerهای هر Main Ticket




}