"use client"

import { useState } from "react"
import Link from "next/link"
import type { Secret } from "@prisma/client"
import { Copy, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface SecretViewProps {
  secret: Secret
}

export function SecretView({ secret }: SecretViewProps) {
  const [copied, setCopied] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(secret.content)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The environment variables have been copied to your clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadAsFile() {
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
    <>
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
        <Textarea value={secret.content} readOnly className="font-mono h-40" />
      </div>

      <div className="rounded-md bg-muted p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Sharing</h4>
            <p className="text-sm text-muted-foreground">Share this secret with others</p>
          </div>
          <Link href={`/dashboard/secret/${secret.id}/share`}>
            <Button>Share Secret</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

