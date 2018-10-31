const formDataConfigForUI = {
  windowConfig: {
    // tagShow: true,
    searchField: 'ProjectName',
    placeholder: '请输入合同名称test',
    tableListType: 'table',
    textNameOption: {
      title: {
        text: '合同名称',
        show: true,
        field: 'ProjectName',
        type: 'text'
      },
      left: {
        text: '发起人',
        show: true,
        field: 'RegHumName',
        type: 'text'
      },
      center: {
        text: '更新时间',
        show: true,
        field: 'UpdDate',
        type: 'datePicker'
      },
      right: {
        text: '状态',
        show: false,
        field: 'ContractStatus',
        type: 'text'
      },
      tag: {
        text: '',
        show: true,
        field: 'Status',
        type: 'select'
      }
    }
  },
  formConfig: {
    formTitle: '',
    // tab按钮的宽度
    tabUnitWidth: 120,
    // 是否启用附件
    fileAttach: true,
    // 是否启用报表
    report: false,
    // 是否启用评论
    comment: false,
    // switchs 权限判断规则
    switchsPermission: {
      field: 'ContractId',
      fieldType: 'ajax',
      condition: {
        valueSource: 'Exec',
        dataParams: {
          KeyWord: 'IncomContract',
          MethodName: 'GetServiceType',
          MethodParams: {
            ContractId: 'ContractId'
          }
        },
        value: ['73c4cb01-608a-6f07-fef2-f61f9a5e54b0', ''],
        addStatus: {
          excludeIndex: []
        },
        viewStatus: {
          excludeIndex: []
        },
        default: {
          excludeIndex: []
        },
        yes: {
          excludeIndex: []
        },
        no: {
          excludeIndex: [2]
        }
      }
    },
    // 对应tab按钮和数据信息配置
    switchs: [
      {
        name: '基本信息',
        KeyWord: 'CHMC_DevelopInvoiceRegister',
        type: 'mainTable', // common,childTable
        style: 'none', // common,treeGrid
        tableShowField: [
          {
            label: '项目财务编号',
            type: 'text',
            field: 'FinanceNum',
            placeholder: '',
            readonly: true
          },
          {
            label: '项目编号',
            type: 'text',
            field: 'ProjectCode',
            placeholder: '',
            readonly: true
          },
          {
            label: '项目名称',
            type: 'text',
            field: 'ProjectName',
            placeholder: '',
            readonly: true
          },
          {
            label: '合同编号',
            type: 'text',
            field: 'ContractCode',
            placeholder: '',
            readonly: true
          },
          {
            label: '合同类型',
            type: 'text',
            field: 'ContractType',
            placeholder: '',
            readonly: true
          },
          {
            label: '合同名称',
            type: 'text',
            field: 'ContractName',
            placeholder: '',
            readonly: true
          },
          {
            label: '发票类型',
            type: 'text',
            field: 'InvoiceType',
            placeholder: '',
            readonly: true
          },
          {
            label: '登记日期',
            type: 'datePicker',
            field: 'InvoiceDate',
            placeholder: '',
            readonly: true
          },
          {
            label: '开票币种',
            type: 'text',
            field: 'ContractCurrency',
            placeholder: '',
            readonly: true
          },
          {
            label: '汇率',
            type: 'text',
            field: 'ExchangeRate',
            placeholder: '',
            readonly: true
          },
          {
            label: '价税合计金额(外币)',
            type: 'text',
            field: 'InvoiceMoney',
            placeholder: '',
            readonly: true
          },
          {
            label: '价税合计金额(人民币)',
            type: 'text',
            field: 'CumulativeInvoiceMoney',
            placeholder: '',
            readonly: true
          },
          {
            label: '申请部门',
            type: 'text',
            field: 'DepartmentName',
            placeholder: '',
            readonly: true
          },
          {
            label: '申请人',
            type: 'text',
            field: 'ApplyPerson',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商名称',
            type: 'text',
            field: 'PartyAUnit',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商纳税人识别号',
            type: 'text',
            field: 'IdentNum',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商电话',
            type: 'text',
            field: 'Telephone',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商地址',
            type: 'text',
            field: 'Address',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商银行账户',
            type: 'text',
            field: 'BankAccount',
            placeholder: '',
            readonly: true
          },
          {
            label: '供应商开户银行',
            type: 'text',
            field: 'OpenBank',
            placeholder: '',
            readonly: true
          },
          {
            label: '是否出口项目',
            type: 'text',
            field: 'IsExport',
            placeholder: '',
            readonly: true
          },
          {
            label: '表单状态',
            type: 'text',
            field: 'Status',
            placeholder: '',
            readonly: true
          },
          {
            label: '备注',
            type: 'textarea',
            field: 'InvoiceName',
            placeholder: '',
            readonly: true
          },
          {
            label: '录入人',
            type: 'text',
            field: 'RegHumName',
            placeholder: '',
            readonly: true
          },
          {
            label: '录入日期',
            type: 'datePicker',
            field: 'RegDate',
            placeholder: '',
            readonly: true
          }
        ]
      },
      {
        name: '商品明细',
        KeyWord: 'CHMC_DevelopCommodityDetail',
        type: 'childTable',
        style: 'common',
        data: {},
        tableListType: 'table',
        formListOption: {
          textNameOption: {
            title: {
              text: '发票编号', // diy
              show: true, // true | false
              field: 'InvoiceNum', // diy
              type: 'text' // text | percent | number | datePicker
            },
            left: {
              text: '商品名称',
              show: true,
              field: 'MaterialName',
              type: 'text'
            },
            center: {
              text: '发票类型',
              show: true,
              field: 'InvoiceType',
              type: 'text'
            },
            right: {
              text: '金额',
              show: true,
              field: 'UnitPrice',
              type: 'text'
            }
          }
        },
        tableShowField: [
          {
            label: '发票编号',
            type: 'text',
            field: 'InvoiceNum',
            placeholder: '',
            readonly: true
          },
          {
            label: '发票类型',
            type: 'text',
            field: 'InvoiceType',
            placeholder: '',
            readonly: true
          },
          {
            label: '是否出口项目',
            type: 'text',
            field: 'IsExport',
            placeholder: '',
            readonly: true
          },
          {
            label: '规格型号',
            type: 'text',
            field: 'Model',
            placeholder: '',
            readonly: true
          },
          {
            label: '计量单位',
            type: 'text',
            field: 'Unit',
            placeholder: '',
            readonly: true
          },
          {
            label: '数量',
            type: 'text',
            field: 'Number',
            placeholder: '',
            readonly: true
          },
          {
            label: '金额',
            type: 'text',
            field: 'UnitPrice',
            placeholder: '',
            readonly: true
          },
          {
            label: '税率',
            type: 'text',
            field: 'TaxRate',
            placeholder: '',
            readonly: true
          },
          {
            label: '税额',
            type: 'text',
            field: 'TaxPayment',
            placeholder: '',
            readonly: true
          },
          {
            label: '价税合计',
            type: 'text',
            field: 'UnitSumPrice',
            placeholder: '',
            readonly: true
          },
          {
            label: '是否退税',
            type: 'text',
            field: 'comboboxcolumn',
            placeholder: '',
            readonly: true
          },
          {
            label: '退税率',
            type: 'text',
            field: 'RebateTaxRate',
            placeholder: '',
            readonly: true
          },
          {
            label: 'FOB价(美元)',
            type: 'text',
            field: 'FOBPrice',
            placeholder: '',
            readonly: true
          },
          {
            label: '开票汇率',
            type: 'text',
            field: 'BillingRate',
            placeholder: '',
            readonly: true
          },
          {
            label: '退税额',
            type: 'text',
            field: 'RebateTaxPayment',
            placeholder: '',
            readonly: true
          },
          {
            label: '转工程施工/成本',
            type: 'text',
            field: 'CostAmount',
            placeholder: '',
            readonly: true
          },
          {
            label: '转工程结算/收入',
            type: 'text',
            field: 'RevenueAmount',
            placeholder: '',
            readonly: true
          },
          {
            label: '进项税',
            type: 'text',
            field: 'InputTax',
            placeholder: '',
            readonly: true
          },
          {
            label: '销项税',
            type: 'text',
            field: 'OutputTax',
            placeholder: '',
            readonly: true
          },
          {
            label: '报关单号',
            type: 'text',
            field: 'CustomsFormNum',
            placeholder: '',
            readonly: true
          },
          {
            label: '备注',
            type: 'text',
            field: 'Remark',
            placeholder: '',
            readonly: true
          }
        ]
      },
      {
        name: '发票明细',
        KeyWord: 'CHMC_DevelopInvoiceDetail',
        type: 'childTable',
        style: 'common',
        data: {},
        tableListType: 'table',
        formListOption: {
          textNameOption: {
            title: {
              text: '发票编号',
              show: true,
              field: 'InvoiceNum',
              type: 'text'
            },
            left: {
              text: '发票金额',
              show: true,
              field: 'InvoiceAmount',
              type: 'text'
            },
            center: {
              text: '发票类型',
              show: false,
              field: 'InvoiceType',
              type: 'text'
            },
            right: {
              text: '开票日期',
              show: true,
              field: 'InvoiceDate',
              type: 'datePicker'
            }
          }
        },
        tableShowField: [
          {
            label: '发票顺序号',
            type: 'text',
            field: 'InvoiceCode',
            placeholder: '',
            readonly: true
          },
          {
            label: '发票编号',
            type: 'text',
            field: 'InvoiceNum',
            placeholder: '',
            readonly: true
          },
          {
            label: '发票金额',
            type: 'text',
            field: 'InvoiceAmount',
            placeholder: '',
            readonly: true
          },
          {
            label: '发票类型',
            type: 'text',
            field: 'InvoiceType',
            placeholder: '',
            readonly: true
          },
          {
            label: '开票日期',
            type: 'datePicker',
            field: 'InvoiceDate',
            placeholder: '',
            readonly: true
          },
          {
            label: '备注',
            type: 'textarea',
            field: 'Remark',
            placeholder: '',
            readonly: true
          }
        ],
        subTable: 'withAttach'
      }
    ]
  }
}

export default formDataConfigForUI
