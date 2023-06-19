import { Model } from "sequelize";
import { sequelize, DataTypes } from "../../config/db";
import { Snowflake } from "@theinternetfolks/snowflake";

interface RoleAttributes {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

interface RoleInstance extends Model<RoleAttributes>, RoleAttributes { }

const RoleModel = sequelize.define("Role", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'role',
    hooks: {
        beforeCreate(role: RoleInstance) {
            role.id = Snowflake.generate();
        }
    },
});

export default RoleModel;