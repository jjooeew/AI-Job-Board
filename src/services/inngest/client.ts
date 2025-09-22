import { DeletedObjectJSON, UserJSON } from "@clerk/nextjs/server";
import { EventSchemas, Inngest } from "inngest";

type ClerkWebhookData<T> = {
  data: {
    data: T;
    raw: string;
    headers: Record<string, string>;
  };
};

type Events = {
  "clerk/user.created": ClerkWebhookData<UserJSON>;
  "clerk/user.updated": ClerkWebhookData<UserJSON>;
  "clerk/user.deleted": ClerkWebhookData<DeletedObjectJSON>;
};

// type Events = {
//   "clerk/user.created": { data: UserJSON };
//   "clerk/user.updated": { data: UserJSON };
//   "clerk/user.deleted": { data: DeletedObjectJSON };
// };

export const inngest = new Inngest({
  id: "ai-job-board",
  schemas: new EventSchemas().fromRecord<Events>(),
});
