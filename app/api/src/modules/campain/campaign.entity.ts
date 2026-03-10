import type { Channel } from "../../enums";

export interface Campaign {
  id: string;
  name: string;
  message: string;
  channel: Channel;
  targetTags: string[];
  createdAt: Date;
  updatedAt: Date;
}
