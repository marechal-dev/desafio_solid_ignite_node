import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userDoesNotExists = !this.usersRepository.findById(user_id);

    if (userDoesNotExists) {
      throw new Error("User does not exists!");
    }

    const userIsNotAdmin = !this.usersRepository.findById(user_id).admin;

    if (userIsNotAdmin) {
      throw new Error("You need to be an admin to list the users!");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
