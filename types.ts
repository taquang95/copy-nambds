import React from 'react';

export interface UserLead {
    name: string;
    email: string;
}

export interface FeatureItem {
    title: string;
    description: string;
    icon: React.ReactNode;
}