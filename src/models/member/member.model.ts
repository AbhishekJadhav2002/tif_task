import { Model } from "sequelize";
import { sequelize, DataTypes } from "../../config/db";
import { Snowflake } from "@theinternetfolks/snowflake";
import CommunityModel from "../community/community.model";
import UserModel from "../user/user.model";
import RoleModel from "../role/role.model";

interface MemberAttributes {
    id: string;
    community: string;
    user: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

interface MemberInstance extends Model<MemberAttributes>, MemberAttributes { }

const MemberModel = sequelize.define("Member", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    community: {
        type: DataTypes.UUID,
        references: {
            model: CommunityModel,
            key: 'id',
        },
        allowNull: false,
    },
    user: {
        type: DataTypes.UUID,
        references: {
            model: UserModel,
            key: 'id',
        },
        allowNull: false,
    },
    role: {
        type: DataTypes.UUID,
        references: {
            model: RoleModel,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'member',
    hooks: {
        beforeCreate(member: MemberInstance) {
            member.id = Snowflake.generate();
        }
    },
});

export default MemberModel;