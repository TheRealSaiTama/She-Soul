
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WorkplaceWellness = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold mb-6">
          Workplace <span className="text-shesoul-bubblegum">Wellness</span>
        </h1>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white bg-opacity-90 mb-8 border-none">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Our workplace wellness resources are currently under development.
                Soon you'll be able to:
              </p>
              
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Access resources for managing women's health in workplace settings</li>
                <li>Get guides for HR departments to better support women's health</li>
                <li>Use self-advocacy tools and templates for workplace accommodations</li>
                <li>Find information on workplace rights by country/region</li>
                <li>Get wellness program recommendations for your organization</li>
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

export default WorkplaceWellness;
