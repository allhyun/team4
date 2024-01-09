import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import MarketHeader from '../../components/Market/MarketHeader';
import MarketThumbnailPost from '../../components/Market/MarketThumbnailPost';
import '../../styles/style.scss';

export default function UserHeartListPage() {
  return (
    <>
      {/* <MarketHeader /> */}
      <div>
        <div className="market-main-container"></div>
        <div className="market-main-page-container"></div>
      </div>
    </>
  );
}
