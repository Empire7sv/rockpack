import { UserModel } from '../models/User';
import { StatisticModel } from '../models/Statistic';
import { RoleModel } from '../models/Role';
import { StatisticTypeModel } from '../models/StatisticType';
import { BadRequest, InternalError, SequelizeError } from '../errors/errors';

export class UserRepository {
  static getUserByEmail = async (email: string): Promise<UserModel> => {
    const userType = await StatisticTypeModel.findOne({
      where: {
        type: 'user'
      }
    });

    if (!userType) {
      throw new InternalError();
    }

    try {
      return await UserModel.findOne({
        limit: 1,
        where: {
          email
        },
        include: [
          {
            model: StatisticModel,
            where: {
              type_id: userType.get('id')
            },
            required: false
          },
          {
            model: RoleModel,
            attributes: {
              exclude: ['id']
            },
            required: false
          }
        ]
      });
    } catch (e) {
      throw new SequelizeError(e);
    }
  };

  static getUserById = async (id: number): Promise<UserModel> => {
    const userType = await StatisticTypeModel.findOne({
      where: {
        type: 'user'
      }
    });

    if (!userType) {
      throw new InternalError();
    }

    try {
      return await UserModel.findOne({
        limit: 1,
        where: {
          id
        },
        include: [
          {
            model: StatisticModel,
            where: {
              type_id: userType.get('id')
            },
            required: false
          },
          {
            model: RoleModel,
            attributes: {
              exclude: ['id']
            },
            required: false
          }
        ]
      });
    } catch (e) {
      throw new SequelizeError(e);
    }
  };

  static getUsers = async (): Promise<UserModel[]> => {
    const userType = await StatisticTypeModel.findOne({
      where: {
        type: 'user'
      }
    });

    if (!userType) {
      throw new InternalError();
    }

    const userRole = await RoleModel.findOne({
      where: {
        role: 'user'
      }
    });

    if (!userRole) {
      throw new BadRequest();
    }

    try {
      return await UserModel.findAll({
        attributes: {
          exclude: ['role_id']
        },
        include: [
          {
            model: StatisticModel,
            where: {
              type_id: userType.get('id')
            },
            required: false
          },
          {
            model: RoleModel,
            attributes: {
              exclude: ['id']
            },
            required: false
          }
        ],
      });
    } catch (e) {
      throw new SequelizeError(e);
    }
  };
}