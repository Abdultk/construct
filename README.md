# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

# Advanced Procurement Module - Budget-Linked Intelligent System
## Overview
A comprehensive procurement system that maintains budget integrity by linking all material and labor requests directly to the project's Bill of Quantities (BOQ) and budget, with intelligent AI-powered supplier comparison, automated contract generation, and real-time cost tracking.

### 1. BOQ-Integrated Request Initiation
#### Master BOQ Database
##### BOQ Structure & Organization

Hierarchical cost breakdown structure:

*   **Level 1**: Project phases (Foundation, Superstructure, Finishes, etc.)
*   **Level 2**: Work packages (Excavation, Concrete Works, Blockwork, etc.)
*   **Level 3**: Cost codes (specific items with unique identifiers)


Each line item contains:

*   **Cost Code**: Unique identifier (e.g., FND-CON-001 for foundation concrete)
*   **Item Description**: Detailed specification
*   **Unit of Measurement**: Bags, tons, cubic meters, trips, etc.
*   **Quantity**: Original budgeted amount
*   **Unit Rate**: Budgeted cost per unit
*   **Total Budget**: Quantity × Unit Rate
*   **Supplier Category**: Material, labor, equipment, subcontractor
*   **Priority Level**: Critical path items flagged
*   **Procurement Schedule**: When items need to be ordered

#### BOQ Import & Integration

*   Upload BOQ from Excel/CSV (with template matching)
*   Import from quantity surveying software (CostX, Cubit, Candy)
*   Manual entry with guided templates
*   Version control for BOQ revisions
*   Baseline BOQ vs Current BOQ comparison
*   Automatic cost code generation following naming conventions

| Quota | Description | Limit | Can be increased | Scope | Product version |
| --- | --- | --- | --- | --- | --- |

### Doha

#### Doha

| | Pricing beyond the free quota |
| --- | --- |
| Document reads | $0.036 per 100,000 documents |
| Document writes | $0.109 per 100,000 documents |
| Document deletes | $0.012 per 100,000 documents |
| TTL deletes | $0.012 per 100,000 documents |
| Stored data | $0.182/GiB/month |
| PITR data | $0.182/GiB/month |
| Backup data | $0.036/GiB/month |
| Restore operation | $0.243/GiB |