import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import { devLog } from "@/utils/devLog";
import { Loader } from "./ui/loading";
import { cn } from "@/lib/utils";

export const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post<{ message: string }>(
        "/api/v1/public/contact",
        formData
      );

      toast({
        title: res.data.message || "Support request sent",
        description:
          "We've received your message and will get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      // @ts-expect-error: error is of type 'unknown', casting to 'any' to access properties
    } catch (error: Error) {
      devLog(error);
      if (error.response) {
        setError(error.response.data.message);
        toast({
          title: "Error",
          description:
            error.response.data.message ||
            "Failed to send message. Please try again.",
          variant: "destructive",
        });
      } else {
        setError(error.message);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
        <CardDescription>
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your name"
              className={cn(
                error && error.trim() !== "" && formData.name.trim() === ""
                  ? "border-red-600"
                  : ""
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your email address"
              className={cn(
                error && error.trim() !== "" && formData.email.trim() === ""
                  ? "border-red-600"
                  : ""
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger
                className={cn(
                  error && error.trim() !== "" && formData.subject.trim() === ""
                    ? "border-red-600"
                    : ""
                )}
              >
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="technical">Technical Support</SelectItem>
                <SelectItem value="billing">Billing Question</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange(e.target.id, e.target.value)}
              placeholder="Your message"
              className={cn(
                error && error.trim() !== "" && formData.message.trim() === ""
                  ? "border-red-600"
                  : "",
                "min-h-[150px] resize-none"
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader /> : "Send Message"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
