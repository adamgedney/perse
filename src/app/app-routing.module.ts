import { HomeComponent } from './components/home/home.component';
import { AssetDetailComponent } from './components/asset-detail/asset-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
      path: 'asset/:assetName',
      component: AssetDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
