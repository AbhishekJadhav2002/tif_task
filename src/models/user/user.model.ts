import { Model } from "sequelize";
import { sequelize, DataTypes } from "../../config/db";
import { Snowflake } from "@theinternetfolks/snowflake";

interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes { }

const UserModel = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'user',
    hooks: {
        beforeCreate(user: UserInstance) {
            user.id = Snowflake.generate();
        }
    },
});

export default UserModel;