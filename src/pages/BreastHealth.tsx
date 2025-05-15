
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BreastHealth = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-6">
          Breast <span className="text-shesoul-bubblegum">Health</span>
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white bg-opacity-90 mb-8 border-none">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our breast health assessment and support tools are currently under development.
                Soon you'll be able to:
              </p>
              
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Complete personalized risk assessment questionnaires</li>
                <li>Access detailed self-examination guides with animations</li>
                <li>Get personalized intervention plans for your specific needs</li>
                <li>View exercise regimens with video demonstrations</li>
                <li>Book consultations with breast health specialists</li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-shesoul-bubblegum text-white hover:bg-opacity-90">
                  Join Waitlist
                </Button>
                <Button variant="outline" className="border-shesoul-bubblegum text-shesoul-bubblegum hover:bg-shesoul-bubblegum hover:text-white">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BreastHealth;
