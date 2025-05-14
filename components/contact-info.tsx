import { Mail, MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Here are the ways you can reach us.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted-foreground">
                <Link
                  href="mailto:secretshare-support@gmail.com"
                  target="_blank"
                  className="flex items-center text-primary hover:underline"
                >
                  secretshare-support@gmail.com
                </Link>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-sm text-muted-foreground">
                +237 (675) 171 796
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Available Monday-Friday, 9am-5pm WAT.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-sm text-muted-foreground">
                Biscuiterie
                <br />
                Biyem-Assi
                <br />
                Nfoundi, Yaounde, Cameroon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
