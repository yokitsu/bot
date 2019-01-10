import Client from '../client';

type DescriptionSupplier = (client: Client) => string;
type CommandInfo = {
    command: string;
    description: string | DescriptionSupplier;
    usage?: string;
    category?: string;
    aliases?: string[];
    checks?: {
        guild?: boolean;
        owner?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    };
    throttle?: number;
};
export default CommandInfo;