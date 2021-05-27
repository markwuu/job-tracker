// To make importing them easier, you can export all models from single file
import User, { UserSchema } from "./User"
import Project, { ProjectSchema } from "./Project"

export default {
  User: {
    model: User,
    schema: UserSchema,
  },
  Project: {
    model: Project,
    schema: ProjectSchema,
  },

}
