import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "database/database.service";
import { CreateAddressDto } from "src/address/dto/create-address.dto";

@Injectable()
export class AddressRepository {
    constructor(private readonly databaseService: DatabaseService) { }


    async create(dto: CreateAddressDto) {

        try {
            const result = await this.databaseService.query(
                `
            INSERT INTO addresses(
                user_id,
                province,
                city,
                address,
                postal_code,
                receiver_mobile,
                display_name
            ) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;
            `,
                [
                    dto.user_id,
                    dto.province,
                    dto.city,
                    dto.address,
                    dto.postal_code,
                    dto.receiver_mobile,
                    dto.display_name ?? null
                ]
            )
            return result;

        } catch (err) {
            if (err.constraint === "fk_addresses_user") {
                throw new NotFoundException('User not found');
            }
        }

    }











}