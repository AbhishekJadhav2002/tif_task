import { Model } from "sequelize";
import { sequelize, DataTypes } from "../../config/db";
import { Snowflake } from "@theinternetfolks/snowflake";
import UserModel from "../user/user.model";

interface CommunityAttributes {
    id: string;
    name: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

interface CommunityInstance extends Model<CommunityAttributes>, CommunityAttributes { }

const CommunityModel = sequelize.define("Community", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    owner: {
        type: DataTypes.UUID,
        references: {
            model: UserModel,
            key: 'id',
        },
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'community',
    hooks: {
        beforeCreate(community: CommunityInstance) {
            community.id = Snowflake.generate();
        }
    },
});

export default CommunityModel;