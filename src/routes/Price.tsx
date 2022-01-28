import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface PriceProps {
  coinId: string;
}

const PriceInfo = styled.div`
  font-size: 30px;
`;

const Info = styled.div`
  font-size: 20px;
  border: 1px solid black;
  border-color: ${(props) => props.theme.accentColor};
  margin: 10px 0;
  padding: 20px;
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <PriceInfo>
          {coinId} Infomation
          {data
            ?.slice(0)
            .reverse()
            .map((price) => (
              <Info key={price.time_open}>
                <div>open: {price.open}</div>
                <div>close: {price.close}</div>
                <div>low: {price.low}</div>
                <div>high: {price.high}</div>
                <div>market cap: {price.market_cap}</div>
                <div>time close: {price.time_close}</div>
                <div>time open: {price.time_open}</div>
                <div>volume: {price.volume}</div>
              </Info>
            ))}
        </PriceInfo>
      )}
    </div>
  );
}

export default Price;
