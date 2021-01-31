import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useVoodooDollar from '../../../hooks/useVoodooDollar';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';

const Stake: React.FC = () => {
  const { VDS: VDS, contracts: { Boardroom } } = useVoodooDollar();
  const [approveStatus, approve] = useApprove(VDS, Boardroom.address);

  const tokenBalance = useTokenBalance(VDS);
  const stakedBalance = useStakedBalanceOnBoardroom();

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={(value) => {
      onStake(value);
      onDismissDeposit();
    }} tokenName={'Voodoo Share'} />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'Voodoo Share'}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="VDS" />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance)} />
            <Label text="Voodoo Share Staked" />
          </StyledCardHeader>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                onClick={approve}
                text="Approve Voodoo Share"
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
