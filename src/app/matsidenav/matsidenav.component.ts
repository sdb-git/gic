import { Component, OnInit, Optional } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { RouterLink, RouterLinkWithHref, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-matsidenav',
  templateUrl: './matsidenav.component.html',
  styleUrls: ['./matsidenav.component.scss']
})
export class MatsidenavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    currentRoute: string = '';
    enableSideMenu: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    )
        .subscribe((event: any) => {
            console.log("DONE",event);
            if(event.urlAfterRedirects == '/dashboard'){
              this.enableSideMenu = false;
            }
            else{
              this.enableSideMenu = true;
            }
        });
    }

  ngOnInit(){
    
  }

}
