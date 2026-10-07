import React from 'react'
import Header from "@/components/common/Header";
import FooterSection from "@/components/common/Footer";
import Blogtitle from '@/components/blog/Blogtitle';
import MarketingSoul from '@/components/blog/MarketingSoul';
import FollowersIntoCustomers from '@/components/blog/FollowersIntoCustomers';

export default function page() {
    return (
        <div>
            <Header />
            <Blogtitle title="How Brands Can Turn Followers into Customers" />
            <FollowersIntoCustomers/>
            <FooterSection />
        </div>
    )
}