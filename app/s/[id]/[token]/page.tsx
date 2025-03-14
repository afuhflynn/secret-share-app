"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Copy, Download, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

export default function AccessSecretPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [secret, setSecret] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function fetchSecret() {
      try {
        // Demo mode - simulate fetching a secret
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // In a real app, we would fetch the secret from the API
        // For demo purposes, we'll use localStorage
        const storedSecrets = localStorage.getItem("demoSecrets")
        if (storedSecrets) {
          const secrets = JSON.parse(storedSecrets)
          const foundSecret = secrets.find((s: any) => s.id === params.id)

          if (foundSecret) {
            setSecret({
              name: foundSecret.name,
              content:
                foundSecret.content ||
                `API_KEY=demo_api_key_${foundSecret.id}\nDATABASE_URL=demo_database_url_${foundSecret.id}\nSECRET_KEY=demo_secret_key_${foundSecret.id}`,
              expires: foundSecret.expiresAt,
            })
          } else {
            setError("The secret you're trying to access doesn't exist or has expired.")
          }
        } else {
          // If no secrets in localStorage, create a demo one
          setSecret({
            name: "Demo Environment Variables",
            content: `API_KEY=demo_api_key\nDATABASE_URL=demo_database_url\nSECRET_KEY=demo_secret_key`,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          })
        }
      } catch (error) {
        console.error(error)
        setError("The secret you're trying to access doesn't exist or has expired.")
      } finally {
        setLoading(false)
      }
    }

    fetchSecret()
  }, [params.id, params.token])

  function copyToClipboard() {
    if (!secret) return

    navigator.clipboard.writeText(secret.content)
    setCopied(true)

    toast({
      title: "Copied to clipboard",
      description: "The environment variables have been copied to your clipboard.",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  function downloadAsFile() {
    if (!secret) return

    const element = document.createElement("a")
    const file = new Blob([secret.content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `${secret.name.toLowerCase().replace(/\s+/g, "-")}.env`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "Downloaded",
      description: "The environment variables have been downloaded as a file.",
    })
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Secure Environment Variables</h1>
          <p className="text-sm text-muted-foreground">Someone has shared environment variables with you.</p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="mt-4 text-sm text-muted-foreground">Loading environment variables...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-destructive/10 p-3">
                <Lock className="h-6 w-6 text-destructive" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Access Denied</h2>
              <p className="mt-2 text-center text-sm text-muted-foreground">{error}</p>
              <Link href="/" className="mt-6">
                <Button variant="outline">Go to Homepage</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{secret?.name}</CardTitle>
              <CardDescription>Expires on {new Date(secret?.expires || "").toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Environment Variables</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="mr-2 h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadAsFile}>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea value={secret?.content} readOnly className="font-mono h-40" />
              </div>

              <div className="rounded-md bg-muted p-4">
                <p className="text-sm">
                  <strong>Note:</strong> This is a one-time view. Once you leave this page, you may not be able to
                  access these environment variables again.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-center">
                <Link href="/">
                  <Button variant="outline">Go to Homepage</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

