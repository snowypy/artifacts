"use server"

import { getServerSession } from "next-auth/next"

export async function donateNode(data: {
    cpuCores: number
    ramGB: number
    storageGB: number
    availability: string
}) {
    const session = await getServerSession()

    if (!session) {
        throw new Error("You must be logged in to donate a node")
    }

    // Here you would typically save the node information to your database
    // For now, we'll just log it
    console.log("Node donated:", { user: session.user, ...data })

    // In a real application, you might return some confirmation data
    return { success: true }
}

