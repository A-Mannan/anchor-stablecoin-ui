import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AnchorEngine
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const anchorEngineAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'stETHAddress', internalType: 'address', type: 'address' },
      { name: 'priceFeedAddress', internalType: 'address', type: 'address' },
      { name: '_anchorUSDAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'anchorUSD',
    outputs: [
      { name: '', internalType: 'contract IAnchorUSD', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'badCollateralRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'becomeRedemptionProvider',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositEtherToMint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'stETHamount', internalType: 'uint256', type: 'uint256' },
      { name: 'mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositStETHToMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'payAmountInAnchorUSD',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'excessIncomeDistribution',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeStored',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchEthPriceInUsd',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllBorrowers',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllRedemptionProviders',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getBorrowerAtIndex',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBorrowersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'getRedemptionProviderAtIndex',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRedemptionProvidersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'governance',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'isBorrower',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_user', internalType: 'address', type: 'address' }],
    name: 'isRedemptionProvider',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'keeperRate',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastReportTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'provider', internalType: 'address', type: 'address' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'etherAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'liquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mintFeeApy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'provider', internalType: 'address', type: 'address' },
      { name: 'anchorUSDAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redeemCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'anchorUSDAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'redeemFromAllProviders',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'redemptionFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'removeRedemptionProvider',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'safeCollateralRatio',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newApy', internalType: 'uint256', type: 'uint256' }],
    name: 'setBorrowApy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_governance', internalType: 'address', type: 'address' }],
    name: 'setGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRate', internalType: 'uint8', type: 'uint8' }],
    name: 'setKeeperRate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newFee', internalType: 'uint8', type: 'uint8' }],
    name: 'setRedemptionFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newRatio', internalType: 'uint256', type: 'uint256' }],
    name: 'setSafeCollateralRatio',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'provider', internalType: 'address', type: 'address' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'etherAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'superLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAnchorUSDCirculation',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalDepositedEther',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'userPositions',
    outputs: [
      { name: 'debt', internalType: 'uint256', type: 'uint256' },
      { name: 'collateral', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newApy',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BorrowApyChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sponsor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sponsor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'DepositEther',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newGovernance',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'GovernanceAuthorityTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newSlippage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'KeeperRateChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'stETHAdded',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'payoutAnchorUSD',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LSDistribution',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'provider',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'keeper',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'anchorUSDAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'LiquidateEtherAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'keeperReward',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'superLiquidation',
        internalType: 'bool',
        type: 'bool',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LiquidationRecord',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sponsor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'provider',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'anchorUSDAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'etherAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RedeemedCollateral',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newSlippage',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RedemptionFeeChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'user',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'status', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'RedemptionProvider',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newRatio',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SafeCollateralRatioChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sponsor',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'onBehalfOf',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timestamp',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'WithdrawEther',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AnchorUSD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const anchorUsdAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_anchorEngine', internalType: 'address', type: 'address' },
      { name: '_feeReceiver', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FLASH_LOAN_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'anchorEngine',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_burnAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_account', internalType: 'address', type: 'address' },
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnShares',
    outputs: [
      { name: 'newTotalShares', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'eip712Domain',
    outputs: [
      { name: 'fields', internalType: 'bytes1', type: 'bytes1' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'version', internalType: 'string', type: 'string' },
      { name: 'chainId', internalType: 'uint256', type: 'uint256' },
      { name: 'verifyingContract', internalType: 'address', type: 'address' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'extensions', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeReceiver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'flashFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'receiver',
        internalType: 'contract IERC3156FlashBorrower',
        type: 'address',
      },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'flashLoan',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_sharesAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getMintedAnchorUSDByShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_anchorUSDAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getSharesByMintedAnchorUSD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_spender', internalType: 'address', type: 'address' },
      { name: '_addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'maxFlashLoan',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_recipient', internalType: 'address', type: 'address' },
      { name: '_mintAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_account', internalType: 'address', type: 'address' }],
    name: 'sharesOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  { type: 'event', anonymous: false, inputs: [], name: 'EIP712DomainChanged' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'preRebaseTokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'postRebaseTokenAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'sharesAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'SharesBurnt',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'sharesValue',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferShares',
  },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'deadline', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC2612ExpiredSignature',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC2612InvalidSigner',
  },
  {
    type: 'error',
    inputs: [{ name: 'maxLoan', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC3156ExceededMaxLoan',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC3156InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'ERC3156UnsupportedToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'currentNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAccountNonce',
  },
  { type: 'error', inputs: [], name: 'InvalidShortString' },
  {
    type: 'error',
    inputs: [{ name: 'str', internalType: 'string', type: 'string' }],
    name: 'StringTooLong',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__
 */
export const useReadAnchorEngine = /*#__PURE__*/ createUseReadContract({
  abi: anchorEngineAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"anchorUSD"`
 */
export const useReadAnchorEngineAnchorUsd = /*#__PURE__*/ createUseReadContract(
  { abi: anchorEngineAbi, functionName: 'anchorUSD' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"badCollateralRatio"`
 */
export const useReadAnchorEngineBadCollateralRatio =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'badCollateralRatio',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"feeStored"`
 */
export const useReadAnchorEngineFeeStored = /*#__PURE__*/ createUseReadContract(
  { abi: anchorEngineAbi, functionName: 'feeStored' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"fetchEthPriceInUsd"`
 */
export const useReadAnchorEngineFetchEthPriceInUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'fetchEthPriceInUsd',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getAllBorrowers"`
 */
export const useReadAnchorEngineGetAllBorrowers =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getAllBorrowers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getAllRedemptionProviders"`
 */
export const useReadAnchorEngineGetAllRedemptionProviders =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getAllRedemptionProviders',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getBorrowerAtIndex"`
 */
export const useReadAnchorEngineGetBorrowerAtIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getBorrowerAtIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getBorrowersCount"`
 */
export const useReadAnchorEngineGetBorrowersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getBorrowersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getRedemptionProviderAtIndex"`
 */
export const useReadAnchorEngineGetRedemptionProviderAtIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getRedemptionProviderAtIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"getRedemptionProvidersCount"`
 */
export const useReadAnchorEngineGetRedemptionProvidersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'getRedemptionProvidersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"governance"`
 */
export const useReadAnchorEngineGovernance =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'governance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"isBorrower"`
 */
export const useReadAnchorEngineIsBorrower =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'isBorrower',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"isRedemptionProvider"`
 */
export const useReadAnchorEngineIsRedemptionProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'isRedemptionProvider',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"keeperRate"`
 */
export const useReadAnchorEngineKeeperRate =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'keeperRate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"lastReportTime"`
 */
export const useReadAnchorEngineLastReportTime =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'lastReportTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"mintFeeApy"`
 */
export const useReadAnchorEngineMintFeeApy =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'mintFeeApy',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"redemptionFee"`
 */
export const useReadAnchorEngineRedemptionFee =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'redemptionFee',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"safeCollateralRatio"`
 */
export const useReadAnchorEngineSafeCollateralRatio =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'safeCollateralRatio',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"totalAnchorUSDCirculation"`
 */
export const useReadAnchorEngineTotalAnchorUsdCirculation =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'totalAnchorUSDCirculation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"totalDepositedEther"`
 */
export const useReadAnchorEngineTotalDepositedEther =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'totalDepositedEther',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"userPositions"`
 */
export const useReadAnchorEngineUserPositions =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorEngineAbi,
    functionName: 'userPositions',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__
 */
export const useWriteAnchorEngine = /*#__PURE__*/ createUseWriteContract({
  abi: anchorEngineAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"becomeRedemptionProvider"`
 */
export const useWriteAnchorEngineBecomeRedemptionProvider =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'becomeRedemptionProvider',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteAnchorEngineBurn = /*#__PURE__*/ createUseWriteContract({
  abi: anchorEngineAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"depositEtherToMint"`
 */
export const useWriteAnchorEngineDepositEtherToMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'depositEtherToMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"depositStETHToMint"`
 */
export const useWriteAnchorEngineDepositStEthToMint =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'depositStETHToMint',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"excessIncomeDistribution"`
 */
export const useWriteAnchorEngineExcessIncomeDistribution =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'excessIncomeDistribution',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"liquidation"`
 */
export const useWriteAnchorEngineLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'liquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAnchorEngineMint = /*#__PURE__*/ createUseWriteContract({
  abi: anchorEngineAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"redeemCollateral"`
 */
export const useWriteAnchorEngineRedeemCollateral =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'redeemCollateral',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"redeemFromAllProviders"`
 */
export const useWriteAnchorEngineRedeemFromAllProviders =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'redeemFromAllProviders',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"removeRedemptionProvider"`
 */
export const useWriteAnchorEngineRemoveRedemptionProvider =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'removeRedemptionProvider',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setBorrowApy"`
 */
export const useWriteAnchorEngineSetBorrowApy =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'setBorrowApy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setGovernance"`
 */
export const useWriteAnchorEngineSetGovernance =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'setGovernance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setKeeperRate"`
 */
export const useWriteAnchorEngineSetKeeperRate =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'setKeeperRate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setRedemptionFee"`
 */
export const useWriteAnchorEngineSetRedemptionFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'setRedemptionFee',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setSafeCollateralRatio"`
 */
export const useWriteAnchorEngineSetSafeCollateralRatio =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'setSafeCollateralRatio',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"superLiquidation"`
 */
export const useWriteAnchorEngineSuperLiquidation =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'superLiquidation',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteAnchorEngineWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorEngineAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__
 */
export const useSimulateAnchorEngine = /*#__PURE__*/ createUseSimulateContract({
  abi: anchorEngineAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"becomeRedemptionProvider"`
 */
export const useSimulateAnchorEngineBecomeRedemptionProvider =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'becomeRedemptionProvider',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateAnchorEngineBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"depositEtherToMint"`
 */
export const useSimulateAnchorEngineDepositEtherToMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'depositEtherToMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"depositStETHToMint"`
 */
export const useSimulateAnchorEngineDepositStEthToMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'depositStETHToMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"excessIncomeDistribution"`
 */
export const useSimulateAnchorEngineExcessIncomeDistribution =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'excessIncomeDistribution',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"liquidation"`
 */
export const useSimulateAnchorEngineLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'liquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAnchorEngineMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"redeemCollateral"`
 */
export const useSimulateAnchorEngineRedeemCollateral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'redeemCollateral',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"redeemFromAllProviders"`
 */
export const useSimulateAnchorEngineRedeemFromAllProviders =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'redeemFromAllProviders',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"removeRedemptionProvider"`
 */
export const useSimulateAnchorEngineRemoveRedemptionProvider =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'removeRedemptionProvider',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setBorrowApy"`
 */
export const useSimulateAnchorEngineSetBorrowApy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'setBorrowApy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setGovernance"`
 */
export const useSimulateAnchorEngineSetGovernance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'setGovernance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setKeeperRate"`
 */
export const useSimulateAnchorEngineSetKeeperRate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'setKeeperRate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setRedemptionFee"`
 */
export const useSimulateAnchorEngineSetRedemptionFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'setRedemptionFee',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"setSafeCollateralRatio"`
 */
export const useSimulateAnchorEngineSetSafeCollateralRatio =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'setSafeCollateralRatio',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"superLiquidation"`
 */
export const useSimulateAnchorEngineSuperLiquidation =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'superLiquidation',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorEngineAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateAnchorEngineWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorEngineAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__
 */
export const useWatchAnchorEngineEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: anchorEngineAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"BorrowApyChanged"`
 */
export const useWatchAnchorEngineBorrowApyChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'BorrowApyChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchAnchorEngineBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'Burn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"DepositEther"`
 */
export const useWatchAnchorEngineDepositEtherEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'DepositEther',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"GovernanceAuthorityTransfer"`
 */
export const useWatchAnchorEngineGovernanceAuthorityTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'GovernanceAuthorityTransfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"KeeperRateChanged"`
 */
export const useWatchAnchorEngineKeeperRateChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'KeeperRateChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"LSDistribution"`
 */
export const useWatchAnchorEngineLsDistributionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'LSDistribution',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"LiquidationRecord"`
 */
export const useWatchAnchorEngineLiquidationRecordEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'LiquidationRecord',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchAnchorEngineMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"RedeemedCollateral"`
 */
export const useWatchAnchorEngineRedeemedCollateralEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'RedeemedCollateral',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"RedemptionFeeChanged"`
 */
export const useWatchAnchorEngineRedemptionFeeChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'RedemptionFeeChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"RedemptionProvider"`
 */
export const useWatchAnchorEngineRedemptionProviderEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'RedemptionProvider',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"SafeCollateralRatioChanged"`
 */
export const useWatchAnchorEngineSafeCollateralRatioChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'SafeCollateralRatioChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorEngineAbi}__ and `eventName` set to `"WithdrawEther"`
 */
export const useWatchAnchorEngineWithdrawEtherEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorEngineAbi,
    eventName: 'WithdrawEther',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__
 */
export const useReadAnchorUsd = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadAnchorUsdDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorUsdAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"FLASH_LOAN_FEE"`
 */
export const useReadAnchorUsdFlashLoanFee = /*#__PURE__*/ createUseReadContract(
  { abi: anchorUsdAbi, functionName: 'FLASH_LOAN_FEE' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadAnchorUsdAllowance = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"anchorEngine"`
 */
export const useReadAnchorUsdAnchorEngine = /*#__PURE__*/ createUseReadContract(
  { abi: anchorUsdAbi, functionName: 'anchorEngine' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAnchorUsdBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadAnchorUsdDecimals = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"eip712Domain"`
 */
export const useReadAnchorUsdEip712Domain = /*#__PURE__*/ createUseReadContract(
  { abi: anchorUsdAbi, functionName: 'eip712Domain' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"feeReceiver"`
 */
export const useReadAnchorUsdFeeReceiver = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'feeReceiver',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"flashFee"`
 */
export const useReadAnchorUsdFlashFee = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'flashFee',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"getMintedAnchorUSDByShares"`
 */
export const useReadAnchorUsdGetMintedAnchorUsdByShares =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorUsdAbi,
    functionName: 'getMintedAnchorUSDByShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"getSharesByMintedAnchorUSD"`
 */
export const useReadAnchorUsdGetSharesByMintedAnchorUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorUsdAbi,
    functionName: 'getSharesByMintedAnchorUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"getTotalShares"`
 */
export const useReadAnchorUsdGetTotalShares =
  /*#__PURE__*/ createUseReadContract({
    abi: anchorUsdAbi,
    functionName: 'getTotalShares',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"maxFlashLoan"`
 */
export const useReadAnchorUsdMaxFlashLoan = /*#__PURE__*/ createUseReadContract(
  { abi: anchorUsdAbi, functionName: 'maxFlashLoan' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"name"`
 */
export const useReadAnchorUsdName = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadAnchorUsdNonces = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"sharesOf"`
 */
export const useReadAnchorUsdSharesOf = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'sharesOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadAnchorUsdSymbol = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadAnchorUsdTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: anchorUsdAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__
 */
export const useWriteAnchorUsd = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteAnchorUsdApprove = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteAnchorUsdBurn = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"burnShares"`
 */
export const useWriteAnchorUsdBurnShares = /*#__PURE__*/ createUseWriteContract(
  { abi: anchorUsdAbi, functionName: 'burnShares' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useWriteAnchorUsdDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorUsdAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"flashLoan"`
 */
export const useWriteAnchorUsdFlashLoan = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'flashLoan',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useWriteAnchorUsdIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorUsdAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteAnchorUsdMint = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteAnchorUsdPermit = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteAnchorUsdTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: anchorUsdAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteAnchorUsdTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: anchorUsdAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__
 */
export const useSimulateAnchorUsd = /*#__PURE__*/ createUseSimulateContract({
  abi: anchorUsdAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateAnchorUsdApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateAnchorUsdBurn = /*#__PURE__*/ createUseSimulateContract(
  { abi: anchorUsdAbi, functionName: 'burn' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"burnShares"`
 */
export const useSimulateAnchorUsdBurnShares =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'burnShares',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const useSimulateAnchorUsdDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"flashLoan"`
 */
export const useSimulateAnchorUsdFlashLoan =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'flashLoan',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"increaseAllowance"`
 */
export const useSimulateAnchorUsdIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateAnchorUsdMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: anchorUsdAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateAnchorUsdPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateAnchorUsdTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link anchorUsdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateAnchorUsdTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: anchorUsdAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__
 */
export const useWatchAnchorUsdEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: anchorUsdAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchAnchorUsdApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorUsdAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 */
export const useWatchAnchorUsdEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorUsdAbi,
    eventName: 'EIP712DomainChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__ and `eventName` set to `"SharesBurnt"`
 */
export const useWatchAnchorUsdSharesBurntEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorUsdAbi,
    eventName: 'SharesBurnt',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchAnchorUsdTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorUsdAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link anchorUsdAbi}__ and `eventName` set to `"TransferShares"`
 */
export const useWatchAnchorUsdTransferSharesEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: anchorUsdAbi,
    eventName: 'TransferShares',
  })
