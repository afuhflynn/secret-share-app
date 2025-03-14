"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Copy, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

export default function ShareSecretPage() {
  const params = useParams()
  const router = useRouter()
  const [secret, setSecret] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareLink, setShareLink] = useState("")
  const [accessType, setAccessType] = useState("anyone")
  const [emails, setEmails] = useState("")
  const [expiryTime, setExpiryTime] = useState("7d")

  useEffect(() => {
    // In a real app, we would fetch the secret from the API
    // For demo purposes, we'll use localStorage
    const storedSecrets = localStorage.getItem("demoSecrets")
    if (storedSecrets) {
      const secrets = JSON.parse(storedSecrets)
      const foundSecret = secrets.find((s: any) => s.id === params.id)
      if (foundSecret) {
        setSecret(foundSecret)
      } else {
        router.push("/dashboard")
      }
    } else {
      router.push("/dashboard")
    }
    setIsLoading(false)
  }, [params.id, router])

  async function generateShareLink() {
    setGenerating(true)

    try {
      // Demo mode - simulate generating a share link
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate a random token
      const token = Math.random().toString(36).substring(2, 15)

      // Create a share link
      const link = `${window.location.origin}/s/${params.id}/${token}`
      setShareLink(link)

      toast({
        title: "Share link generated",
        description: "You can now share this link with others.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to generate share link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "The share link has been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return <div className="flex min-h-[50vh] items-center justify-center">Loading...</div>
  }

  if (!secret) {
    return null
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Button variant="ghost" className="mb-4 flex items-center text-muted-foreground" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Share {secret.name}</CardTitle>
          <CardDescription>Generate a secure link to share your environment variables.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Access Control</Label>
            <RadioGroup defaultValue="anyone" onValueChange={setAccessType} className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3 rounded-md border p-3">
                <RadioGroupItem value="anyone" id="anyone" />
                <Label htmlFor="anyone" className="flex cursor-pointer items-center gap-2 font-normal">
                  <span>Anyone with the link</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-md border p-3">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email" className="flex cursor-pointer items-center gap-2 font-normal">
                  <span>Specific email addresses</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {accessType === "email" && (
            <div className="space-y-2">
              <Label htmlFor="emails">Email Addresses</Label>
              <Input
                id="emails"
                placeholder="Enter email addresses, separated by commas"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Only these email addresses will be able to access the secret.
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="expiry">Expiration</Label>
              <Select defaultValue="7d" onValueChange={setExpiryTime}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select expiration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="24h">24 hours</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                  <SelectItem value="never">Never (Pro plan only)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border p-3">
            <div className="space-y-0.5">
              <Label htmlFor="notify">Email Notification</Label>
              <p className="text-xs text-muted-foreground">Get notified when someone accesses this secret.</p>
            </div>
            <Switch id="notify" />
          </div>

          {shareLink ? (
            <div className="space-y-2">
              <Label htmlFor="shareLink">Share Link</Label>
              <div className="flex items-center gap-2">
                <Input id="shareLink" value={shareLink} readOnly className="font-mono" />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Share this link with others to give them access to your environment variables.
              </p>
            </div>
          ) : (
            <Button onClick={generateShareLink} className="w-full" disabled={generating}>
              <Share2 className="mr-2 h-4 w-4" />
              {generating ? "Generating..." : "Generate Share Link"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

