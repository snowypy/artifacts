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

    return { success: true }
}

