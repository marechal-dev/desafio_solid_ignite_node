import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const userDoesNotExist = !this.usersRepository.findById(user_id);

    if (userDoesNotExist) {
      throw new Error("User does not exists!");
    }

    const user = this.usersRepository.findById(user_id);

    const updatedUser = this.usersRepository.turnAdmin(user);

    return updatedUser;
  }
}

export { TurnUserAdminUseCase };
