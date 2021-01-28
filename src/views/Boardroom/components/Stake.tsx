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
import useBasisCash from '../../../hooks/useBasisCash';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useBoardroomVersion from '../../../hooks/useBoardroomVersion';
import MigrationDisclaimerModal from '../../../components/MigrationDisclaimerModal';

const Stake: React.FC = () => {
  const basisCash = useBasisCash();
  const boardroomVersion = useBoardroomVersion();
  const [approveStatus, approve] = useApprove(
    basisCash.GSS,
    basisCash.boardroomByVersion(boardroomVersion).address,
  );

  const tokenBalance = useTokenBalance(basisCash.GSS);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'Gnostic Share'}
    />,
  );

  const [showDisclaimerModal, dismissDisclaimerModal] = useModal(
    <MigrationDisclaimerModal
      onConfirm={() => onPresentDeposit()}
      onDismiss={() => dismissDisclaimerModal()}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'Gnostic Share'}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="GSS" />
            </CardIcon>
            <Value value={getDisplayBalance(stakedBalance)} />
            <Label text="Gnostic Share Staked" />
          </StyledCardHeader>
          <StyledCardActions>
            {!isOldBoardroomMember && approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                onClick={approve}
                text="Approve Gnostic Share"
              />
            ) : (
              <>
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <StyledActionSpacer />
                <IconButton
                  disabled={isOldBoardroomMember}
                  onClick={() => (!isOldBoardroomMember ? showDisclaimerModal() : null)}
                >
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
