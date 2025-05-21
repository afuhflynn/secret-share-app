import { DeleteAccountButton } from "./delete-account-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const DeleteAccountInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>
        <CardDescription>
          Permanently delete your account and all of your data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Once you delete your account, there is no going back. This action
          cannot be undone.
        </p>
        <DeleteAccountButton />
      </CardContent>
    </Card>
  );
};
