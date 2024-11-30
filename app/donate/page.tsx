import DonateNodeForm from "./donate-node-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Cpu, HardDrive, Zap } from 'lucide-react'

export default async function DonateNodePage() {

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">Donate a Node</h1>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">What are Nodes?</h2>
                <p className="text-lg mb-4">
                    Nodes are the backbone of our ecosystem. They are processes running on individual computers
                    that contribute to building open-source Java projects. By donating a node, you&#39;re offering your
                    computer&#39;s
                    resources to help compile and build artifacts for various GitHub repositories.
                </p>
                <p className="text-lg mb-4">
                    Each node acts as a worker in our distributed build network, pulling tasks from a queue and
                    executing
                    them. This distributed approach allows us to parallelize builds across many machines, significantly
                    speeding up the overall build process for the entire community.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Why Donate a Node?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Zap className="mr-2"/>
                                Accelerate Open Source
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Help speed up build times for countless open-source projects, contributing to faster
                                development cycles.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Cpu className="mr-2"/>
                                Utilize Idle Resources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Put your computer&#39;s idle time to good use by contributing to the open-source
                                community.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <HardDrive className="mr-2"/>
                                Distributed Resilience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Help create a more resilient build network that doesn&#39;t rely on centralized
                                infrastructure.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <CheckCircle className="mr-2"/>
                                Community Recognition
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Get recognized for your contributions to the Jitpack++ community and open-source
                                ecosystem.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">How Easy is it to Set Up?</h2>
                <p className="text-lg mb-4">
                    Setting up a node is incredibly simple. We&#39;ve designed the process to be as straightforward as
                    possible:
                </p>
                <ol className="list-decimal list-inside space-y-2 text- mb-4">
                    <li>Download our node client application</li>
                    <li>Run the installer, which will set up all necessary dependencies</li>
                    <li>Log in with your Jitpack++ account</li>
                    <li>Choose your resource allocation and availability preferences</li>
                    <li>Start the node and you&#39;re done!</li>
                </ol>
                <p className="text-lg mb-4">
                    Our node client runs in the background, using only the resources you&#39;ve allocated and respecting
                    your
                    availability preferences. You can easily monitor your node&#39;s activity and contribution through
                    your
                    Jitpack++ dashboard.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-4">Ready to Contribute?</h2>
                <p className="text-lg mb-4">
                    Fill out the form below to register your node. Once submitted, we&#39;ll provide you with
                    instructions
                    to download and set up the node client on your machine.
                </p>
                <DonateNodeForm/>
            </section>
        </div>
    )
}

